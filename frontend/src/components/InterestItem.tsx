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
        <label>
            <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggle(id)}
            />
            <span>
                {name} - Q{price}
            </span>
        </label>
    );
}

export default InterestItem;