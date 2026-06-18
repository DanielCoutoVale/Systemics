
import SystemDto from "./SystemDto";

class SystemsDto {
    id: number;
    resourceName: string;
    languageName: string;
    systems: SystemDto[];
    constructor(id: number, resourceName: string, languageName: string, systems: SystemDto[]) {
        this.id = id;
        this.resourceName = resourceName;
        this.languageName = languageName;
        this.systems = systems;
    }
}

export default SystemsDto;
