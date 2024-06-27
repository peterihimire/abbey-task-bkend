/*
  Warnings:

  - A unique constraint covering the columns `[acctId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_acctId_key" ON "users"("acctId");
