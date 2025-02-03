import { orderStatusIcons, orderStatusLabels } from "../../../constants";
import { getLastOrderStatus } from "../../../utils";
import { getDay_month_yearFormated } from "../../../utils/convertTodateString";
import { useMemo } from "react";

const OrderTrackingTimeline = ({ status }) => {
    const { orderTimeLine, lastStatus } = useMemo(() => {
        if (status) {
            const orderTimeLine = Object.entries(status).map(
                ([key, value], index) => {
                    if (key === "pending") {
                        return null;
                    }
                    return (
                        <TimelineCards
                            key={index}
                            {...{ name: key, isDone: value.status, time: value.time }}
                        />
                    );
                }
            );
            const lastStatus = getLastOrderStatus(status);
            return { orderTimeLine, lastStatus };
        }
        return {};
    }, [status]);

    return (
        <>
            <h1 className="text-xl font-semibold mb-3">Track your Order</h1>
            {lastStatus && lastStatus.name === "Pending" && (
                <TimelineCards
                    {...{
                        ...lastStatus,
                        name: lastStatus?.name.toLocaleLowerCase(),
                        isDone: true,
                    }}
                />
            )}
            {orderTimeLine}
        </>
    );
};
export default OrderTrackingTimeline;

const TimelineCards = ({ name, isDone, time }) => {
    return name === "cancelled" && !isDone ? null : (
        <>
            {time && (
                <div className="ps-2 my-2 first:mt-0">
                    <h3 className="text-xs font-medium uppercase text-gray-500">
                        {getDay_month_yearFormated(time)}
                    </h3>
                </div>
            )}

            <div className="max-w-md flex gap-x-3 relative group rounded-lg hover:bg-gray-100">
                {/* Timeline */}
                <div
                    className={`relative last:after:hidden after:absolute after:top-0 
            after:bottom-0 after:start-3.5 after:w-[2px] after:-translate-x-[0.5px] ${
                        isDone ? "after:bg-black" : "after:bg-gray-200"
                    }`}
                >
                    <div className="relative z-10 size-7 flex justify-center items-center">
                        <div
                            className={`size-2 rounded-full border-2 ${
                                isDone && "bg-white-A700 border-gray-600"
                            }  border-gray-300 group-hover:border-gray-600`}
                        ></div>
                    </div>
                </div>
                {/*TimeLine */}

                <div className="grow p-2 pb-8">
                    <h3 className="flex gap-x-1.5 items-center font-semibold text-gray-800">
                        {orderStatusIcons[name]}
                        {orderStatusLabels[name]}
                    </h3>
                </div>
            </div>
        </>
    );
};
