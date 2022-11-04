function check(isActive, className) {
    return !className ?
        (
            !isActive ? "day tc-gray":
                "blue day"
        )
        : "day tc-gray " + className;
}

const Number = ({onClick, isActive, className, clickNextDayWhenHavePassedDay, isPassedDay, children}) => {

    return (
        <span
            onClick={!isActive ? onClick : undefined}
            className={
                (clickNextDayWhenHavePassedDay && isPassedDay) || !children ? "noClick day" : check(isActive, className)
            }
        >
            {children}
        </span>
    );
};

export default Number;