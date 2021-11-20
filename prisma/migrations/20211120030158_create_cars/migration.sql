-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "daily_rate" DECIMAL(65,30) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "license_plate" TEXT NOT NULL,
    "fine_amount" DECIMAL(65,30) NOT NULL,
    "brand" TEXT NOT NULL,
    "category_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;
