import { useState } from "react";

interface BoardProps {
    cards: { title: string; items: string[] }[];
}

function Board({ cards }: BoardProps) {
    const [boardCards, setBoardCards] = useState(cards);
    const [newCardTitle, setNewCardTitle] = useState("");

    const removeCard = (index: number) => {
        setBoardCards((prev) => prev.filter((_, i) => i !== index));
    };

    const removeItem = (indexCard: number, indexItem: number) => {
        setBoardCards((prev) =>
            prev.map((card, i) =>
                i === indexCard
                    ? {
                          ...card,
                          items: card.items.filter((_, j) => j !== indexItem),
                      }
                    : card
            )
        );
    };

    const addCard = () => {
        if (newCardTitle.trim()) {
            setBoardCards([
                ...boardCards,
                { title: newCardTitle, items: ["Test item"] },
            ]);
            setNewCardTitle("");
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">My Board (step 7)</h1>
            <p className="text-center mb-4">Add "Add Card" functionality.</p>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter card title"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addCard}>
                    Add Card
                </button>
            </div>
            <div className="row g-4">
                {boardCards.map((card, indexCard) => (
                    <div key={indexCard} className="col-lg-6 col-xl-4">
                        <div className="card shadow-sm">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{card.title}</h5>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeCard(indexCard)}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {card.items.map((item, indexItem) => (
                                        <li
                                            key={indexItem}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            {item}
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    removeItem(
                                                        indexCard,
                                                        indexItem
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
