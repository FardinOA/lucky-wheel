import React, { Fragment, useEffect, useState } from "react";

const WheelGenerator = ({ names }) => {
    const [angles, setAngles] = useState([]);
    const [winner, setWinner] = useState("");
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const totalSegments = names.length;
        const angle = 360 / totalSegments;
        const newAngles = names.map((name, index) => ({
            startAngle: index * angle,
            angle,
            color: getRandomPastelColor(),
            textColor: getBrightTextColor(),
            name,
        }));
        setAngles(newAngles);
    }, [names]);

    // start spin
    const startSpin = () => {
        setRotation(0);
        setIsSpinning(true);
        const duration = Math.floor(Math.random() * 1000) + 3000;
        const finalRotation = 3600 + Math.floor(Math.random() * 360);
        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            determineWinner(finalRotation);
        }, duration);
    };

    // winner calculation
    const determineWinner = (finalRotation) => {
        const totalRotation = finalRotation % 360;
        const winnerAngle = (360 - totalRotation) % 360;

        const winningSegment = angles.find(
            (segment) =>
                winnerAngle >= segment.startAngle &&
                winnerAngle < segment.startAngle + segment.angle
        );

        if (winningSegment) {
            setWinner(winningSegment.name);
        }
    };

    const closeModal = () => {
        setWinner("");
    };

    return (
        <div className="p-8 bg-cream relative">
            <div className="relative border">
                <div
                    id="pointer"
                    className="bg-red-600 h-10 w-[30px] absolute rounded-md left-1/2 -translate-x-1/2 z-10 top-0"
                    style={{
                        clipPath: `polygon(0 0, 50% 100%, 100% 0)`,
                    }}
                ></div>
                <span className="bg-white rounded-full z-10 size-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></span>
                <svg
                    style={{
                        transition: `transform ${isSpinning ? 3 : 0}s ease-out`,
                        transform: `rotate(${rotation}deg)`,
                    }}
                    width="500"
                    height="500"
                >
                    <g transform={`translate(250, 250)`}>
                        {angles.map((angle, index) => (
                            <Fragment key={index}>
                                <path
                                    data-name={angle.name}
                                    d={describeArc(
                                        0,
                                        0,
                                        200,
                                        angle.startAngle,
                                        angle.startAngle + angle.angle
                                    )}
                                    stroke="#fff"
                                    strokeWidth={2}
                                    fill={angle.color}
                                />
                                <text
                                    transform={`rotate(${
                                        angle.startAngle + angle.angle / 2
                                    })`}
                                    x={
                                        getTextPosition(
                                            angle.startAngle + angle.angle / 2,
                                            140
                                        ).x
                                    }
                                    y={
                                        getTextPosition(
                                            angle.startAngle + angle.angle / 2,
                                            140
                                        ).y
                                    }
                                    fill={angle.textColor}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="font-semibold"
                                    style={{
                                        transformBox: "fill-box",
                                        transformOrigin: "center",
                                    }}
                                >
                                    {angle.name}
                                </text>
                            </Fragment>
                        ))}
                    </g>
                </svg>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={startSpin}
                    className="z-10 py-1 px-4 lg:px-8 bg-blue-500 text-white rounded-sm mt-4"
                >
                    Spin
                </button>
            </div>
            {winner && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md text-center">
                        <h2 className="text-2xl font-bold">Congratulations!</h2>
                        <p className="mt-4 text-lg">The winner is: {winner}</p>
                        <button
                            onClick={closeModal}
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
    const startRadians = ((startAngle - 90) * Math.PI) / 180;
    const endRadians = ((endAngle - 90) * Math.PI) / 180;

    const startX = x + radius * Math.cos(startRadians);
    const startY = y + radius * Math.sin(startRadians);
    const endX = x + radius * Math.cos(endRadians);
    const endY = y + radius * Math.sin(endRadians);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        `M ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `L ${x} ${y}`,
        `L ${startX} ${startY}`,
    ].join(" ");
};

const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
};

const getBrightTextColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 30%)`;
};

const getTextPosition = (angle, radius) => {
    const radians = ((angle - 90) * Math.PI) / 180;
    return {
        x: radius * Math.cos(radians),
        y: radius * Math.sin(radians),
    };
};

export default WheelGenerator;
