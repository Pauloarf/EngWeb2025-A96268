const booksModel = require('../models/book')

module.exports.list = () => {
    return booksModel.find().exec()
}
    
module.exports.findById = id => {
    return booksModel.findOne({"bookId" : id}).exec()
}

module.exports.findByCharacter = character => {
    const regex = new RegExp(character);
    return booksModel.find({ characters: { $regex: regex } }).exec();
};
    
module.exports.findByGenre = genre => {
    return booksModel.find({ genres: genre }).exec();
};

module.exports.listGenres = () => {
    return booksModel.aggregate([
        { $unwind: "$genres" },
        { $group: { _id: "$genres" } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, genre: "$_id" } }
    ]);
};

module.exports.listCharacters = () => {
    return booksModel.aggregate([
        { $unwind: "$characters" },
        { $group: { _id: "$characters" } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, character: "$_id" } }
    ]);
};

module.exports.createBook = bookData => {
    const book = new booksModel(bookData);
    return book.save();
};

module.exports.deleteBook = id => {
    return booksModel.findByIdAndDelete(id).exec();
};

module.exports.updateBook = (id, updateData) => {
    return booksModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};