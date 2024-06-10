import Array "mo:base/Array";

actor Biblioteca {

    type Book = {
        id: Nat;
        title: Text;
        genero: Text;
        rating: Nat;
    };

    var Books : [Book] = [
      
    ];

    public func addBook(rating: Nat, title:Text, genero:Text) : async Bool {
        let newId = Array.size(Books) + 1;
        let newBook = {
          id = newId;
          title = title;
          genero = genero;
          rating =rating;
        };

        Books:= Array.append <Book>(Books, [newBook]);
        return true;
    };

    public func getAllBooks() : async [Book] {
        return Books;
    };
    public func GetBookById(id: Nat) : async ?Book {
        return Array.find<Book>(Books, func (b){b.id==id});
    };

    public func updateBook(id: Nat, title : Text, genero: Text, rating :Nat) : async Bool {
        let bookUpdate = Array.find<Book>(Books, func(task) {task.id == id});

        switch(bookUpdate) {
          case(null) { return false };
          case(?bookUpdate) {
            let updateBook ={
              id = id;
              title = title;
              genero = genero;
              rating = rating;
            };
           Books := Array.map<Book, Book>(Books, func(b) {if (b.id == id) { updateBook } else {b} });
           return true;
         };
      };
   };

   public func deleteBook(id: Nat) : async Bool {
     let Book = Array.find<Book>(Books, func(task){ task.id == id});
     if (Book != null){
       Books := Array.filter<Book>(Books, func(task){ task.id==id});
       return true ;
     } else {
       return false;
     };  
   };
};