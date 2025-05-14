export default function SideBar() {
    return (
        <>
            <div>
                <div className="text-2xl text-center">
                    Directions
                </div>
                <div className="p-2">
                    <p>In a grid world, your starting point is the green square in the top-left corner,
                        and your goal is to reach the gold square in the bottom-right corner.
                        Your objective is to move the green block to the finish line.
                        You begin with 200 health points and 450 moves.
                    </p>
                </div>
                <div className="p-2">
                    <div className="text-2xl">Color Key:</div>
                    <ul className="mt-2 space-y-2">
                        <li className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-green-600 border border-black"></div>
                            <span>Start - Green (No Effect)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-green-600 opacity-35 border border-black"></div>
                            <span>Current Position - Dark Green (No Effect)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-yellow-300 border border-black"></div>
                            <span>Finish - Gold (No Effect)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-blue-400 border border-black"></div>
                            <span>Speeder - Blue (-5 Health, -0 Moves)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-red-600 border border-black"></div>
                            <span>Lava - Red (-20 Health, -1 Moves)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-yellow-700 border-black"></div>
                            <span>Mud - Gray (-10 Health, -5 Moves)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-white border border-black"></div>
                            <span>Blank - Gray (-0 Health, -1 Moves)</span>
                        </li>
                    </ul>
                </div>

            </div>
        </>

    );
}