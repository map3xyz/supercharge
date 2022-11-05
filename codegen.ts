require('dotenv/config');
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
  schema: {
    'http://localhost:3001/api/graphql': {
      headers: {
        Authorization: 'Bearer ' + process.env.CONSOLE_ANON_KEY,
      },
    },
  },
};

export default config;
