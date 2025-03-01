exports.getresponse = async (req, res) => {
    const {username, companyName} = req.body;

try {
   if(!username || !companyName){
       return res.status(400).json({ message: 'All fields are required' });
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const ndaContent = `
    <h1>NON-DISCLOSURE AGREEMENT</h1>
    <p>This Non-DDisclosure Agreement (“Agreement”) is made on this ${formattedDate} (“Effective Date”)</p>
    <p>BETWEEN</p>
    <p>Pantomath Capital Advisors Private Limited, a company incorporated in India under the Companies Act, 1956 and having its office at 406-408 Keshava Premises, Bandra Kurla Complex, Bandra-East, Mumbai, Maharashtra, India (hereinafter referred to as the “Disclosing Party”, which expression shall, unless repugnant to the context or meaning thereof, mean and include its successors and permitted assigns) of the First Part.</p>
    <p>AND</p>
    <p>${username}, who is a part of ${companyName} a Limited Partnership incorporated under the laws of United States of America having its headquarters at Mumbai (hereinafter referred to as the “Receiving Party”, which expression shall, unless repugnant to the context or meaning thereof, mean and include its directors, promoters, successors and permitted assigns) of the Second Part.</p>
    <p>Collectively referred to as “Parties” and, individually a “Party”.</p>
    `;

    res.status(201).json({
        pic_name: username,
        company_name: companyName,
        nda_content: ndaContent
    });
    
} catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    
}
}