import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/app-error';
import Section, { ISection } from '../models/section.model';


export const createSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const section: ISection = new Section({ ...req?.body });
        await section.save();
        res.status(201).json({ section });              
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const getSectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req?.params;
        const section: ISection = await Section.findById(id);
        if(!section){
            return next(new AppError("section not found", 404));
        }
        res.status(200).json({ section });              
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const getAllSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sections: ISection[] = await Section.find();
        res.status(200).json({ sections });              
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const editSectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req?.params;
        const section: ISection = await Section.findByIdAndUpdate(
            id,
            {$set: { ...req?.body }},
            {new: true}
        );        
        res.status(200).json({ section, message: "section updated successfully" });              
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}

export const deleteSectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req?.params;
        await Section.deleteOne({ _id: id });
        res.status(200).json({ message: "section deleted successfully" });              
    } catch (error) {
        next(new AppError(error?.message, 400));
    }
}