//import Hol from '@/entities/Holding.ts'

import type Currency from "@/entities/Currency"
import type Holding from "@/entities/Holding"

class HoldingService {
  async listforUser(userId: string): Promise<Holding[]> {

    const currencies:Currency[] = [{
        id: 1,
        symbol: "USD",
        name: "US Dollar",
        kind: "Fiat",
        isActive: true,
        precision: 2,
     },
     {  id: 2,
        symbol: "EUR",
        name: "Euro",
        kind: "Fiat",
        isActive: true,    
        precision: 2,
     },
        {  id: 3,
        symbol: "BTC",
        name: "Bitcoin",
        kind: "Cryptocurrency",
        isActive: true,    
        precision: 8,
     }
    ]

    const getCurrency = (id:number) => { // currencies.find(c => c.id === id) ?? throw new Error(`Currency not found with id=${id}`);
        const currency = currencies.find(c => c.id === id)
        if (!currency) throw new Error(`Currency not found with id=${id}`)
        return currency    
    }

    // For now, return some fake data
    return [
      {
        id: 1,        
        //custodian: { id: 1 },
        currency: getCurrency(1),
        date: new Date(),
        action: "Balance",
        amount: 100.00,
        note: undefined,
      },
      {
        id: 2,
        currency: getCurrency(3),
        date: new Date(),
        action: "Balance",
        amount: 0.0000123,
      },
    ];
  }
}

export default HoldingService;