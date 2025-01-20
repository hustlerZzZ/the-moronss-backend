-- CreateTable
CREATE TABLE "Email_verification" (
    "user_id" INTEGER NOT NULL,
    "otp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_verification_user_id_key" ON "Email_verification"("user_id");

-- CreateIndex
CREATE INDEX "idx_expires_at" ON "Email_verification"("expires_at");

-- AddForeignKey
ALTER TABLE "Email_verification" ADD CONSTRAINT "Email_verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
