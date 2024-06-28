import React, { Fragment, useEffect, useState } from "react";

const WheelGenerator = ({ names }) => {
    // State to manage current angle position of each segment
    const [angles, setAngles] = useState([]);

    // state to control animation
    const [animationClass, setAnimationClass] = useState("");

    // Function to generate angles for each segment based on names
    useEffect(() => {
        const totalSegments = names.length;
        const angle = 360 / totalSegments;
        const newAngles = names.map((name, index) => ({
            startAngle: index * angle,
            angle,
            color: getRandomColor(),
            name,
        }));
        setAngles(newAngles);
    }, [names]);

    // spin controller
    const startSpin = () => {
        setAnimationClass("start-rotate");
        setInterval(() => {
            setAnimationClass("start-rotate stop-rotate");
        }, Math.floor(Math.random() * 10000) + 1);
    };

    return (
        <div className="relative border">
            <div
                className="bg-red-600 h-8 w-16 absolute rounded-md top-1/2 -translate-1/2 z-10 right-5  "
                style={{
                    clipPath: `polygon(0 50%, 100% 100%, 100% 0)`,
                }}
            ></div>
            <svg
                className={animationClass}
                width="500"
                height="500"
                animate={{ rotate: 360 }}
            >
                <g transform={`translate(250, 250)`}>
                    {angles.map((angle, index) => (
                        <Fragment key={index}>
                            <path
                                d={describeArc(
                                    0,
                                    0,
                                    200,
                                    angle.startAngle,
                                    angle.startAngle + angle.angle
                                )}
                                fill={angle.color}
                            />

                            <path
                                d={describeArc(
                                    0,
                                    0,
                                    200,
                                    angle.startAngle,
                                    angle.startAngle + angle.angle
                                )}
                                fill="none"
                                stroke="#fff"
                                strokeWidth="2"
                            />
                            <text
                                x={
                                    getTextPosition(
                                        angle.startAngle + angle.angle / 2,
                                        80
                                    ).x
                                }
                                y={
                                    getTextPosition(
                                        angle.startAngle + angle.angle / 2,
                                        80
                                    ).y
                                }
                                fill="#000"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="font-semibold   "
                            >
                                {angle.name}
                            </text>
                        </Fragment>
                    ))}
                </g>
            </svg>

            <div className="flex justify-center">
                <button
                    onClick={startSpin}
                    className="py-1 px-4 lg:px-8 bg-blue-500 text-white rounded-sm"
                >
                    Spin
                </button>
            </div>
        </div>
    );
};

// Function to describe an arc path
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

// Function to generate random colors
const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Function to calculate text position
const getTextPosition = (angle, radius) => {
    const radians = ((angle - 90) * Math.PI) / 180;
    return {
        x: radius * Math.cos(radians),
        y: radius * Math.sin(radians),
    };
};

export default WheelGenerator;
