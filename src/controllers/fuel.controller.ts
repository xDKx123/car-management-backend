import { load } from 'cheerio';
import logger from '../logging/config';
import { Request, Response, NextFunction } from 'express';

class FuelController {
    public static getPriceForFuel = async (fuelType: string): Promise<number> => {
        /*
        The URL of the website where the fuel prices are listed. We fetch data for slovenia only.
        Prices are in EUR.
        Petrol is used the 95 octane petrol price.
        */
        const url = 'https://www.amzs.si/na-poti/cene-goriv-po-evropi';

        // Fetch the HTML content from the URL
        const response = await fetch(url);
        const data = await response.text();

        const $ = load(data);

        let price = '';

        $('tr').each((index, element) => {
            const country = $(element).find('td').first().text().trim();
            if (country.includes('Slovenija')) {
                switch (fuelType.toLocaleLowerCase()) {
                    case 'petrol':
                        price = $(element).find('td').eq(1).text().trim();
                        break;
                    case 'diesel':
                        price = $(element).find('td').eq(3).text().trim();
                        break;
                }
            }
        });

        // Here price is in format '1,234 EUR, so we need to remove the EUR and replace comma to dot and convert the string to number'

        const number = price.split(' ')[0].replace(',', '.');

        return Number(number);
    }


    public static getFuelPrice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req.body;

        logger.info(data)

        try {
            const fuelType = data.fuelType.toLowerCase();

            const price = await this.getPriceForFuel(fuelType);

            res.status(200).send({
                price: price
            });
        }
        catch (error) {
            next(error)
        }
     }
}

export default FuelController;