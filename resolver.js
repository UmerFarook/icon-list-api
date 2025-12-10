import { nanoid } from "nanoid";

class Icons {
    constructor(id, {
        name = '',
        defaultFontSize = 0,
        color = '',
        svgAvailable = false,
        sizesAvailable = []
    } = {}) {
        this.id = id;
        this.name = name;
        this.defaultFontSize = defaultFontSize;
        this.color = color;
        this.svgAvailable = svgAvailable;
        this.sizesAvailable = sizesAvailable;
    }
}

const iconHolder = {}; // In-memory DB

const resolvers = {
    getIcons: ({ id }) => {
        const data = iconHolder[id];
        if (!data) return null;
        return new Icons(id, data);
    },
    getIconsList: () => {
        return Object.entries(iconHolder).map(([id,data])=> new Icons(id,data));
    },

    setIcons: ({ input }) => {
        const id = nanoid();      // always generate new ID
        iconHolder[id] = { ...input };

        return new Icons(id, iconHolder[id]);
    }
}

export default resolvers;