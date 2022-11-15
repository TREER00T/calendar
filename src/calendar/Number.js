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
                    isPassedDay,
                    children
                }) => {


    return (
        <span
            onClick={!isActive ? onClick : undefined}
            className={
                !children || isPassedDay ? "noClick day"
                    : check(isActive, className)
            }
        >
            {children}
        </span>
    );
};

export default Number;