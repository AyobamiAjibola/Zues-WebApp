import VendorRepository from "../repositories/VendorRepository";

const vendorRepository = new VendorRepository()

export default class CronJob {
    public static async vendorIsExpired () {
        console.log('cron job started')
        const vendors = await vendorRepository.findAll({});
        const currentDate = new Date();

        for (const vendor of vendors) {
            if (vendor.subscription.endDate && vendor.subscription.endDate <= currentDate) {
            await vendorRepository.update({_id: vendor._id}, {isExpired: true});
            }
        }
    }
}

