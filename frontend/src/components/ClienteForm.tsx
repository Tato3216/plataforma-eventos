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
        <section>
            <h2>Ingrese su informacion</h2>

            <div>
                <label htmlFor="name">Nombre</label>
                <input 
                id="name"
                type="text"
                value= {name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="Ingrese su nombre"
                />
            </div>

            <div>
                <label htmlFor="lastName">Apellido</label>
                <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) => onLastNameChange(event.target.value)}
                placeholder="Ingrese su apellido"
                />
            </div>

            <div>
                <label htmlFor="email">Correo electrónico</label>
                <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="correo@ejemplo.com"
                />
            </div>

            <div>
                <label>
                    <input
                    type="checkbox"
                    checked={attends}
                    onChange={(event) => onAttendsChange(event.target.checked)}
                    />Confirmar Asistencia
                </label>
            </div>

            {attends && (
                <div>
                    <label htmlFor="attendanceAt">Fecha y hora de asistencia</label>
                    <input
                    id="attendanceAt"
                    type="datetime-local"
                    value={attendanceAt}
                    onChange={(event) => onAttendanceAtChange(event.target.value)}
                    />
                </div>
            )}
        </section>
    );
}

export default CustomerForm;