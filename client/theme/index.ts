export const pellete = [
    {
        text: "#f97316",
        bgColor: (opacity: number) => {
            return `rgba(251, 146, 60, ${opacity})`
        }
    },
    {
        text: "#334155",
        bgColor: (opacity: number) => {
            return `rgba(30, 41, 59, ${opacity})`
        }
    },
    {
        text: "#7c3aed",
        bgColor: (opacity: number) => {
            return `rgba(167, 139, 250, ${opacity})`
        }
    },
    {
        text: "#009050",
        bgColor: (opacity: number) => {
            return `rgba(0, 179, 87, ${opacity})`
        }
    },
    {
        text: "#14b8a6",
        bgColor: (opacity: number) => {
            return `rgba(45, 212, 191, ${opacity})`
        }
    },
    {
        text: "#dc2626",
        bgColor: (opacity: number) => {
            return `rgba(248, 113, 113, ${opacity})`
        }
    }
]

export const colorThemes = {
    ...pellete[1]
}