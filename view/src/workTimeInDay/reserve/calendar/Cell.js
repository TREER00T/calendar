function check(isActive, className) {
    return !className ? (!isActive ? "day" : (isActive ? "blue " + className : " " + className)) : "day " + className;
}

const Cell = ({onClick, isActive, className, clickNextDayWhenHavePassedDay, isPassedDay, children}) => {

    return (
        <span
            onClick={!isActive ? onClick : undefined}
            className={
                clickNextDayWhenHavePassedDay ? isPassedDay ? "noClick" : check(isActive, className) : check(isActive, className)
            }
        >
            {children}
        </span>
    );
};

export default Cell;