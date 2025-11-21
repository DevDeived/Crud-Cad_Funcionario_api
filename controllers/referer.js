// import prisma from "../db.js";
// import md5 from "md5";

// // LOGIN
// export const loginReferer = async (req, res) => {
//   const { email, senha } = req.body;

//   if (!email || !senha) {
//     return res.status(400).json({ error: "Email e senha são obrigatórios" });
//   }

//   try {
//     const referer = await prisma.referer.findUnique({
//       where: { email: email.toLowerCase().trim() },
//     });

//     if (!referer) {
//       return res.status(401).json({ error: "Email ou senha incorretos" });
//     }

//     const senhaHash = md5(senha);

// const novoReferer = await prisma.referer.create({
//   data: {
//     nome,
//     email: email.toLowerCase().trim(),
//     senha: senhaHash,
//   },
// });

//     const { senha: _, ...dadosReferer } = referer;
//     return res.json(dadosReferer);

//   } catch (err) {
//     console.error("Erro no login:", err);
//     return res.status(500).json({ error: "Erro no servidor" });
//   }
// };

// // CADASTRO
// export const createReferer = async (req, res) => {
//   const { nome, email, senha } = req.body;

//   if (!nome || !email || !senha) {
//     return res.status(400).json({ error: "Todos os campos são obrigatórios" });
//   }

//   try {
//     const jaExiste = await prisma.referer.findUnique({
//       where: { email: email.toLowerCase().trim() },
//     });

//     if (jaExiste) {
//       return res.status(400).json({ error: "Email já cadastrado" });
//     }

//     const senhaHash = md5(senha);

//     const novoReferer = await prisma.referer.create({
//       data: {
//         nome,
//         email: email.toLowerCase().trim(),
//         senha: senhaHash,
//       },
//     });

//     const { senha: _, ...dadosCriados } = novoReferer;
//     return res.status(201).json(dadosCriados);

//   } catch (err) {
//     console.error("Erro ao cadastrar:", err);
//     return res.status(500).json({ error: "Erro ao cadastrar" });
//   }
// };
