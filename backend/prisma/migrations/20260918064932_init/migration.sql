-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Confirmation" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "attends" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serviceSubtotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "serviceDiscountPct" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "serviceDiscount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "serviceTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "productSubtotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "productDiscountPct" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "productDiscount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "productTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT "Confirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmationService" (
    "confirmationId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ConfirmationService_pkey" PRIMARY KEY ("confirmationId","serviceId")
);

-- CreateTable
CREATE TABLE "ConfirmationProduct" (
    "confirmationId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ConfirmationProduct_pkey" PRIMARY KEY ("confirmationId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Confirmation" ADD CONSTRAINT "Confirmation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmationService" ADD CONSTRAINT "ConfirmationService_confirmationId_fkey" FOREIGN KEY ("confirmationId") REFERENCES "Confirmation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmationService" ADD CONSTRAINT "ConfirmationService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmationProduct" ADD CONSTRAINT "ConfirmationProduct_confirmationId_fkey" FOREIGN KEY ("confirmationId") REFERENCES "Confirmation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmationProduct" ADD CONSTRAINT "ConfirmationProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
