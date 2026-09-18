import { describe, expect, it } from "vitest";
import { DescuentoService } from "../src/domain/descuento.service.js";

describe("DescuentoService", () => {
    describe("getServiceDescuento", () => {
        it("returns 0% when fewer than 2 services are selected", () => {
            expect(
                DescuentoService.getServiceDescuento(1, 2000)
            ).toBe(0);
        });

        it("returns 3% for 2 services with subtotal below Q1,500", () => {
            expect(
                DescuentoService.getServiceDescuento(2, 1400)
            ).toBe(3);
        });

        it("returns 3% when subtotal is exactly Q1,500", () => {
            expect(
                DescuentoService.getServiceDescuento(2, 1500)
            ).toBe(3);
        });

        it("returns 5% when subtotal is greater than Q1,500", () => {
            expect(
                DescuentoService.getServiceDescuento(2, 1500.01)
            ).toBe(5);
        });

        it("returns 5% for 2 or more services with subtotal well above Q1,500", () => {
            expect(
                DescuentoService.getServiceDescuento(2, 2000)
            ).toBe(5);
        });
    });

    describe("getProductoDescuento", () => {
        it("returns 0% for no products", () => {
            expect(
                DescuentoService.getProductoDescuento(0)
            ).toBe(0);
        });

        it("returns 0% for 1 product", () => {
            expect(
                DescuentoService.getProductoDescuento(1)
            ).toBe(0);
        });

        it("returns 0% for 2 products", () => {
            expect(
                DescuentoService.getProductoDescuento(2)
            ).toBe(0);
        });

        it("returns 3% for 3 products", () => {
            expect(
                DescuentoService.getProductoDescuento(3)
            ).toBe(3);
        });

        it("returns 3% for 4 products", () => {
            expect(
                DescuentoService.getProductoDescuento(4)
            ).toBe(3);
        });

        it("returns 5% for 5 products", () => {
            expect(
                DescuentoService.getProductoDescuento(5)
            ).toBe(5);
        });

        it("returns 5% for more than 5 products", () => {
            expect(
                DescuentoService.getProductoDescuento(6)
            ).toBe(5);
        });
    });
});