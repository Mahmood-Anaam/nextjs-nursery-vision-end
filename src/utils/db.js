// import {PrismaClient} from '@prisma/client';

// const prisma = new PrismaClient();

// export default prisma;

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

if (typeof globalThis.prismaGlobal === 'undefined') {
  globalThis.prismaGlobal = prismaClientSingleton();
}

const prisma = globalThis.prismaGlobal;

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
