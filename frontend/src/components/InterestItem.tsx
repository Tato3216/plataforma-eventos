interface InterestItemProps {
    id: number;
    name: string;
    price: string;
    selected: boolean;
    onToggle: (id: number) => void;
}

function InterestItem({
    id,
    name,
    price,
    selected,
    onToggle,
}: InterestItemProps) {
    return (
        <label className={`interest-item ${selected ? "selected" : ""}`}>
            <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggle(id)}
            />

            <span className="interest-name">
                {name}
            </span>

            <strong className="interest-price">
                Q{Number(price).toFixed(2)}
            </strong>
        </label>
    );
}

export default InterestItem;