import { prisma } from "../lib/prisma";


export const generateToken = () => Math.floor(100000 + Math.random() * 900000).toString()

async function deleteExpiredTokens() {
  const now = new Date();
  await prisma.token.deleteMany({
    where: {
      expiresAt: { lt: now }, // Elimina tokens cuya fecha de expiración sea menor a la actual
    },
  });
}

// Ejecutar cada cierto tiempo (por ejemplo, cada hora)
setInterval(deleteExpiredTokens, 60 * 60 * 1000); // Cada hora

// export async function isTokenValid(token: string) {
//   const tokenRecord = await prisma.token.findFirst({
//     where: { token },
//   });

//   if (!tokenRecord) {
//     return false; // El token no existe
//   }

//   const now = new Date();
//   return tokenRecord.expiresAt > now; // Verifica si el token aún es válido
// }