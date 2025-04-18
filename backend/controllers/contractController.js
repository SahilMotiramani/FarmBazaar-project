// controllers/contractController.js
const Contract = require('../models/Contract');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and documents
  if (
    file.mimetype.startsWith('image/') || 
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Not an accepted file type'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Middleware to handle multiple file uploads
const uploadFiles = upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'idProof', maxCount: 1 },
  { name: 'landProof', maxCount: 1 }
]);

exports.processUploads = (req, res, next) => {
  uploadFiles(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: 'fail',
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
    
    // Process uploaded files
    if (req.files) {
      // Add file paths to req.body
      if (req.files.images) {
        req.body.images = req.files.images.map(file => file.path);
      }
      if (req.files.idProof) {
        req.body.idProofDocument = req.files.idProof[0].path;
      }
      if (req.files.landProof) {
        req.body.landProofDocument = req.files.landProof[0].path;
      }
    }
    
    next();
  });
};

exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find(req.query);
    
    res.status(200).json({
      status: 'success',
      results: contracts.length,
      contracts
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createContract = async (req, res) => {
  try {
    // Add the current user as the creator of the contract
    req.body.createdBy = req.user.id;
    
    const newContract = await Contract.create(req.body);
    
    res.status(201).json({
      status: 'success',
      contract: newContract
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        status: 'fail',
        message: 'Contract not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      contract
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!contract) {
      return res.status(404).json({
        status: 'fail',
        message: 'Contract not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      contract
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        status: 'fail',
        message: 'Contract not found'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};