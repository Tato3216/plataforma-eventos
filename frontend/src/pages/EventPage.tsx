import { useEffect, useState } from "react";
import { getProducts, getServices, createConfirmation } from "../services/api";
import InterestItem from "../components/InterestItem";
import type { Producto, Servicio } from "../types/catalogo";
import CustomerForm from "../components/ClienteForm";
import type { ConfirmacionResponse } from "../types/confirmacion";

function EventPage() {
    //catalogo
    const [services, setServices] = useState<Servicio[]>([]);
    const [products, setProducts] = useState<Producto[]>([]);
    //seleccionados
    const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    //datos de cliente y asistencia
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    //asistencia
    const [attends, setAttends] = useState(true);
    const [attendanceAt, setAttendanceAt] = useState("");
    //estado de carga
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    //envio
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    //respuestas del backend
    const [confirmation, setConfirmation] = useState<ConfirmacionResponse | null> (null);

    useEffect(() => {
        async function loadCatalog() {
            try {
                const [servicesData, productsData] = await Promise.all([
                    getServices(),
                    getProducts(),
                ]);

                setServices(servicesData);
                setProducts(productsData);
            } catch {
                setError("Error al cargar el catálogo");
            } finally {
                setLoading(false);
            }
        }
        loadCatalog();
    }, []);

    function toggleService(id: number) {
        setSelectedServiceIds((currentIds) =>
            currentIds.includes(id)
                ? currentIds.filter((currentId) => currentId !== id)
                : [...currentIds, id]
        );
    }

    function toggleProduct(id: number) {
        setSelectedProductIds((currentIds) =>
            currentIds.includes(id)
                ? currentIds.filter((currentId) => currentId !== id)
                : [...currentIds, id]
        );
    }

    function handleAttendsChange(value: boolean) {
        setAttends(value);

        if(!value) {
            setAttendanceAt("");
            setSelectedServiceIds([]);
            setSelectedProductIds([]);
        }
    }

    async function handleSubmit() {
        setSubmitError("");
        setConfirmation(null);

        if(!name.trim() || !lastName.trim() || !email.trim()) {
            setSubmitError("Completa el nombre, apellido y correo electronico.");
            return;
        }

        if(attends && !attendanceAt) {
            setSubmitError("Seleccciona la fecha y hora de asistencia.");
            return;
        }

        try {
            setSubmitting(true);
            /*
            * datetime-local produce algo como:
            *
            * 2026-09-25T08:53
            *
            * Ese valor representa la hora local del navegador.
            */
           const attendanceAtUtc =
           attends && attendanceAt
           ? new Date(attendanceAt).toISOString()
           :null;

           const response = await createConfirmation({
            customer: {
                name: name.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
            },

            attends,
            attendanceAt: attendanceAtUtc,

            serviceIds: attends ? selectedServiceIds : [],
            productIds: attends ? selectedProductIds : [],
           });

           setConfirmation(response);
        } catch (error) {
            if(error instanceof Error) {
                setSubmitError(error.message);
            }else{
                setSubmitError("Ocurrio un error inesperado")
            }
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <main> Cargando catalogo...</main>;
    }

    if (error) {
        return <main>{error}</main>;
    }

    return (
        <main>
            <h1>Feria de Promociones</h1>

            <CustomerForm
            name={name}
            lastName={lastName}
            email={email}
            attends={attends}
            attendanceAt={attendanceAt}
            onNameChange={setName}
            onLastNameChange={setLastName}
            onEmailChange={setEmail}
            onAttendsChange={handleAttendsChange}
            onAttendanceAtChange={setAttendanceAt}
            />

            {attends && (
            <>
            <section>
            <h2>Servicios</h2>

            {services.map((service) => (
                <InterestItem
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    price={service.price}
                    selected={selectedServiceIds.includes(service.id)}
                    onToggle={toggleService}
                />
            ))}
            </section>

            <section>
            <h2>Productos</h2>

            {products.map((product) => (
                <InterestItem
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    selected={selectedProductIds.includes(product.id)}
                    onToggle={toggleProduct}
                />
            ))}
            </section>
            </>
            )}

            <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            >
                {submitting ? "Confirmando..." : "Confirmar Asistencia"}
            </button>

            {submitError && (
                <p>
                    {submitError}
                </p>
            )}

            {confirmation && (
                <section>
                    <hr />
                    <h2>Confirmacion registrada</h2>

                    <p>
                        Confirmación #{confirmation.confirmationId}
                    </p>

                    <p>
                        Cliente: {confirmation.customer.name}{" "}
                        {confirmation.customer.lastName}
                    </p>

                    <p>
                        Asistencia: {confirmation.attends ? "Sí" : "No"}
                    </p>

                    {confirmation.attendanceAt && (
                        <p>
                            Fecha y hora: {" "}
                            {new Date(
                                confirmation.attendanceAt
                            ).toLocaleDateString()}
                        </p>
                    )}

                    {confirmation.attends && (
                        <>
                        <h3>Servicios</h3>
                        <p>
                            Subtotal: Q
                            {confirmation.summary.services.subtotal}
                        </p>

                        <p>
                            Descuento:{" "}
                            {confirmation.summary.services.discountPct}%
                        </p>

                        <p>
                            Descuento aplicado: Q
                            {confirmation.summary.services.discount}
                        </p>

                        <p>
                            Total: Q
                            {confirmation.summary.services.total}
                        </p>

                        <h3>Productos</h3>

                        <p>
                            Subtotal: Q
                            {confirmation.summary.products.subtotal}
                        </p>

                        <p>
                            Descuento:{" "}
                            {confirmation.summary.products.discountPct}%
                        </p>

                        <p>
                            Descuento aplicado: Q
                            {confirmation.summary.products.discount}
                        </p>

                        <p>
                            Total: Q
                            {confirmation.summary.products.total}
                        </p>
                        </>
                    )}

                </section>
            )}
        </main>
    );
}

export default EventPage;