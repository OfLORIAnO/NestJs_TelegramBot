-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "user" (
    "telegramId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("telegramId")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "task_status" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
