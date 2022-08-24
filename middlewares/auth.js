const admin = true

const auth = (req,res,next) => {

  if (admin){

    next()

 }

 return  res.status(403).json({message:'No autorizado...'});
}

export {auth};