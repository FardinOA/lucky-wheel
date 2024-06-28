"use client";
import React, { useState } from "react";
import WheelGenerator from "./WheelGenerator";

const Wheel = () => {
    const [names, setNames] = useState(["Segment 1", "Segment 2", "Segment 3"]);
    const [name, setName] = useState("");

    const addNames = () => {
        setNames((prev) => [...prev, name]);
    };
    return (
        <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <div className="space-x-2">
                    <input
                        className="border px-2 rounded-sm bg-white outline-none py-1"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Enter name"
                    />
                    <button
                        className=" py-1 px-4 rounded-sm bg-blue-500 text-white "
                        onClick={addNames}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Wheel;