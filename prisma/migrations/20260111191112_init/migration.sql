-- CreateTable
CREATE TABLE "Referer" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Referer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "beneficiario" TEXT,
    "cidade" TEXT,
    "fone" TEXT,
    "data_nascimento" TEXT,
    "pix" TEXT,
    "refererId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referer_email_key" ON "Referer"("email");

-- CreateIndex
CREATE INDEX "User_refererId_idx" ON "User"("refererId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_refererId_fkey" FOREIGN KEY ("refererId") REFERENCES "Referer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
