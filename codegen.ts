import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/generated/apollo-gql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  overwrite: true,
  schema: 'http://localhost:3001/api/graphql',
};

export default config;
