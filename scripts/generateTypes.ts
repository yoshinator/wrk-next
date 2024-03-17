//write a script to generate types from the prisma schema. It should convert optional values to the type or undefined not null.
// it should look in the prisma directory that is one level up from here. It should output the types to the src/types directory that is one level up from here.
//if src/types does not exist, it should create it as src/types/index.ts
// it should skipt values that have defaults like id and createdAt and updatedAt
const fs = require('fs')
const path = require('path')

const prismaDir = path.join(__dirname, '..', 'prisma')
const typesDir = path.join(__dirname, '..', 'src', 'types')

// Create types directory if it doesn't exist
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir)
}

// Read the prisma schema file
const prismaSchema = fs.readFileSync(
  path.join(prismaDir, 'schema.prisma'),
  'utf-8'
)
type PrismaType = 'String' | 'DateTime' | 'Boolean' | 'Int'
type TypeScriptType = 'string' | 'Date' | 'boolean' | 'number'

const typeMapping: Record<PrismaType, TypeScriptType> = {
  String: 'string',
  DateTime: 'Date',
  Boolean: 'boolean',
  Int: 'number',
}

interface Field {
  name: string
  type: TypeScriptType
  optional: boolean
}

function parseModels(schemaStr: string): { [key: string]: Field[] } {
  const modelBlocks = schemaStr.match(/model \w+ {[^}]*}/g)
  if (!modelBlocks) {
    throw new Error('No models found')
  }

  const models: { [key: string]: Field[] } = {}

  modelBlocks.forEach((block) => {
    const modelNameMatch = block.match(/model (\w+) {/)
    if (!modelNameMatch) return

    const modelName = modelNameMatch[1]
    models[modelName] = parseModel(block)
  })

  return models
}

function parseModel(modelStr: string): Field[] {
  const lines = modelStr.split('\n')
  const fields: Field[] = []

  lines.forEach((line) => {
    if (
      line.includes('@id') ||
      line.trim().startsWith('//') ||
      line.trim().startsWith('@')
    ) {
      return
    }

    const parts = line.trim().split(/\s+/)
    if (parts.length < 2) {
      return
    }

    const name = parts[0]
    const isOptional = parts[1].endsWith('?')
    const type = parts[1].replace('?', '') as PrismaType

    // Handle relations or unsupported types gracefully
    const tsType = typeMapping[type] || 'any'

    fields.push({
      name,
      type: tsType,
      optional: isOptional,
    })
  })

  return fields
}

function generateTypeScriptInterface(
  modelName: string,
  fields: Field[]
): string {
  let interfaceStr = `export type ${modelName} = {\n`
  fields.forEach((field) => {
    interfaceStr += `  ${field.name}${field.optional ? '?' : ''}: ${
      field.type
    };\n`
  })
  interfaceStr += '};\n'
  return interfaceStr
}

function convertPrismaSchemaToTypeScript(schemaStr: string): string {
  const models = parseModels(schemaStr)
  return Object.entries(models)
    .map(([modelName, fields]) =>
      generateTypeScriptInterface(modelName, fields)
    )
    .join('\n')
}

const types = convertPrismaSchemaToTypeScript(prismaSchema)
fs.writeFileSync(path.join(typesDir, 'generatedTypes.ts'), types)
