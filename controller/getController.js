const axios = require('axios')
const AppError = require('../utils/AppError');
const asyncWrapper = require('../utils/asyncWrapper');

const profileInfo = {email: 'chiboyitzprince26@gmail.com',
                     name: 'Favour Ebere Stephen',
                     stack: 'Node.JS/Express.JS'
}


const getProfile = asyncWrapper(async (req, res, next) => {
    const currentDate = new Date().toISOString()
    const response = await axios.get('https://catfact.ninja/fact', {timeout:10000, //10 seconds,
        })
    const catFact = response.data.fact

    if(!response || !response.data){
        return next(new AppError('Failed to fetch cat fact', 500))
    }

   res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        status: 'success',
        user: profileInfo,
        timestamp: currentDate,
        fact: catFact
    })
})

module.exports = getProfile;