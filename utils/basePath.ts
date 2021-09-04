import path from 'path';

let basePath = process.cwd();

if (process.env.NODE_ENV === 'production') {
  basePath = path.join(process.cwd(), '.next/server/chunks');
}

export default basePath;
