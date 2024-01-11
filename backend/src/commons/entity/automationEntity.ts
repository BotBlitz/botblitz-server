import mongoose from "mongoose";
import { IAutomation } from "../interface/IAutomation";
import { IRepository } from "../interface/IRepository";

const automationSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: [true, "Code already available"],
        require: [true, "Code is required"]
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    checksum: {
        type: String,
        require: true
    },
    version: {
        type: String,
        require: true
    },
    lastVersions: {
        type: Array,
        require: false
    },
    createdBy: {
        type: String,
        require: false
    },
    createdAt: {
        type: String,
        require: false
    },
}, { collection: 'automation' })


type AutomationType = IAutomation & mongoose.Document
const AutomationModel = mongoose.model<AutomationType>('automation', automationSchema)

class AutomationRepository implements IRepository {

    public async findById(id: string) {
        return await AutomationModel.findById(id);
    }

    public async findAll(){
        return await AutomationModel.find();
    }

    public async findByCode(code: String) {
        let entity = await AutomationModel.findOne({ code: code })
        if (entity) {
            return entity
        }
        return null;
    }

    public async save(automation: IAutomation) {
        let entity = await AutomationModel.findOne({ code: automation.code })
        if (!entity) {
            await AutomationModel.create(automation)
            return
        }
        await AutomationModel.updateOne({ _id: entity.id }, automation)
    }
}

export const automationRespository = new AutomationRepository()