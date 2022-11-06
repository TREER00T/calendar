function check(isActive, className) {
    return (!className ?
        !isActive ? "tc-gray " :
            "blue "
        : " tc-gray " + className) + " day"
}

const Number = ({
                    onClick,
                    isActive,
                    className,
                    isPassedMonth,
                    isPassedYear,
                    clickNextDayWhenHavePassedDay,
                    isPassedDay,
                    children
                }) => {


    return (
        <span
            onClick={!isActive ? onClick : undefined}
            className={
                !children ? "noClick day" :
                    isPassedDay ? "noClick day"
                : check(isActive, className)
            }
        >
            {children}
        </span>
    );
};

export default Number;