const School = require('../models/school.model'); // Import the school model

const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { default: mongoose } = require("mongoose");

// Dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/schools/';

    // 'uploads' klasörü mevcut değilse oluştur
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Dosya yükleme hedefi olarak 'uploads/schools' klasörünü belirt
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Dosya uzantısını al
    const timestamp = Date.now(); // Zaman damgası
    cb(null, `${timestamp}${ext}`); // Dosya adı zaman damgası ve uzantı ile kaydedilecek
  }
});

// Dosya yükleme middleware
const upload = multer({ storage: storage }).fields([
  { name: 'mainSchoolImg', maxCount: 1 },
  { name: 'schoolRoomImgs', maxCount: 5 }
]);

// createSchool fonksiyonu
exports.createSchool = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Dosya kontrolü
      if (!req.files || !req.files.mainSchoolImg || !req.files.schoolRoomImgs) {
        return res.status(400).json({ error: "Image files are missing" });
      }

      const { title, description, location, latitude, longitude } = req.body;

      // URL için dinamik URL oluşturma
      const mainSchoolImgUrl = `https://canadabackend.huseyn.online/uploads/schools/${req.files.mainSchoolImg[0].filename}`;
      const schoolRoomImgsUrls = req.files.schoolRoomImgs.map(file => `https://canadabackend.huseyn.online/uploads/schools/${file.filename}`);

      // Yeni okul oluşturma
      const newSchool = new School({
        title,
        mainSchoolImg: mainSchoolImgUrl,
        schoolRoomImgs: schoolRoomImgsUrls,
        description,
        location,
        latitude,
        longitude,
      });

      // Okulu veritabanına kaydetme
      await newSchool.save();

      // Başarıyla oluşturulmuş okul ile birlikte yanıt gönder
      res.status(201).json({ message: 'School created successfully!', school: newSchool });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating school', error });
  }
};

// Get all schools
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools', error });
  }
};

// Get a school by ID
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching school', error });
  }
};

// Update a school by ID
exports.updateSchool = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Yeni fotoğraf varsa, eski fotoğrafları sil
      const school = await School.findById(req.params.id);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }

      // Fotoğraflar var mı kontrol et
      let mainSchoolImgUrl = school.mainSchoolImg;
      let schoolRoomImgsUrls = school.schoolRoomImgs;

      if (req.files.mainSchoolImg) {
        // Eski fotoğrafı sil (isteğe bağlı)
        const oldMainSchoolImg = school.mainSchoolImg.split('/').pop();
        fs.unlinkSync(`uploads/schools/${oldMainSchoolImg}`);

        // Yeni fotoğrafı yükle
        mainSchoolImgUrl = `http://localhost:5000/uploads/schools/${req.files.mainSchoolImg[0].filename}`;
      }

      if (req.files.schoolRoomImgs) {
        // Eski odaların fotoğraflarını sil (isteğe bağlı)
        school.schoolRoomImgs.forEach(img => {
          const oldRoomImg = img.split('/').pop();
          fs.unlinkSync(`uploads/schools/${oldRoomImg}`);
        });

        // Yeni odaların fotoğraflarını yükle
        schoolRoomImgsUrls = req.files.schoolRoomImgs.map(file => `http://localhost:5000/uploads/schools/${file.filename}`);
      }

      // Okulun verilerini güncelle
      const updatedSchool = await School.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          mainSchoolImg: mainSchoolImgUrl,
          schoolRoomImgs: schoolRoomImgsUrls,
        },
        { new: true }
      );

      res.status(200).json({ message: 'School updated successfully!', school: updatedSchool });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating school', error });
  }
};

// Delete a school by ID
exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Fotoğrafları sil
    const mainSchoolImg = school.mainSchoolImg.split('/').pop();
    fs.unlinkSync(`uploads/schools/${mainSchoolImg}`);

    school.schoolRoomImgs.forEach(img => {
      const roomImg = img.split('/').pop();
      fs.unlinkSync(`uploads/schools/${roomImg}`);
    });

    // Okulu sil
    await school.remove();
    res.status(200).json({ message: 'School deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting school', error });
  }
};

