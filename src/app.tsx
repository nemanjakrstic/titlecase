import { useState } from "preact/hooks";

export const App = () => {
    const [input, setInput] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const titleCasedInput = toTitleCase(input);

    const handleTitleClick = async () => {
        await navigator.clipboard.writeText(titleCasedInput);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <main className="p-4">
            <input
                value={input}
                className="mx-auto mb-4 block w-full max-w-3xl rounded"
                type="text"
                placeholder="Type something..."
                onInput={(e) => setInput(e.currentTarget.value)}
            />

            <div className="text-center">
                <h2 className="mb-4 inline-block cursor-pointer text-3xl text-blue-500" onClick={handleTitleClick}>
                    {titleCasedInput}
                </h2>

                {isCopied ? <div className="text-sm text-green-500">Copied</div> : null}
            </div>
        </main>
    );
};

const toTitleCase = (input: string) => {
    return input
        .toLowerCase()
        .replace(/\s+/, " ")
        .trim()
        .split(" ")
        .map((word, index) => {
            // First word
            if (index === 0) {
                return startCase(word);
            }

            if (!isLowerCase(word)) {
                return startCase(word);
            }

            return word;
        })
        .join(" ");
};

const startCase = (word: string) => {
    if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
    }

    return word;
};

const isLowerCase = (word: string) => {
    return (
        word.length <= 3 ||
        shortConjunctions.includes(word) ||
        articles.includes(word) ||
        shortPrepositions.includes(word)
    );
};

const shortConjunctions = ["and", "as", "but", "for", "if", "nor", "or", "so", "yet"];
const articles = ["the", "a", "an"];
const shortPrepositions = ["as", "at", "by", "for", "in", "of", "off", "on", "per", "to", "up", "via"];
