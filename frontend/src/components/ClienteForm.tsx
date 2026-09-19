interface ClienteFormProps {
    name: string;
    lastName: string;
    email: string;
    attends: boolean;
    attendanceAt: string;

    onNameChange: (value: string) => void;
    onLastNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onAttendsChange: (value: boolean) => void;
    onAttendanceAtChange: (value: string) => void;
}

function CustomerForm({
    name,
    lastName,
    email,
    attends,
    attendanceAt,
    onNameChange,
    onLastNameChange,
    onEmailChange,
    onAttendsChange,
    onAttendanceAtChange,
}: ClienteFormProps) {
    return (
        <section className="customer-card">
            <h2 className="step-title">
                <span>1</span>
                Ingrese su información
            </h2>

            <div className="form-card">
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => onNameChange(event.target.value)}
                        placeholder="Introduzca su nombre"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Apellidos:</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(event) => onLastNameChange(event.target.value)}
                        placeholder="Introduzca sus apellidos"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => onEmailChange(event.target.value)}
                        placeholder="Introduzca su Email"
                    />
                </div>

                <div className="attendance-check">
                    <label>
                        <input
                            type="checkbox"
                            checked={attends}
                            onChange={(event) =>
                                onAttendsChange(event.target.checked)
                            }
                        />
                        Confirmar asistencia
                    </label>
                </div>

                {attends && (
                    <div className="form-group">
                        <label htmlFor="attendanceAt">Fecha y Hora:</label>
                        <input
                            id="attendanceAt"
                            type="datetime-local"
                            value={attendanceAt}
                            onChange={(event) =>
                                onAttendanceAtChange(event.target.value)
                            }
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default CustomerForm;