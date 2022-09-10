package models

type User struct {
	Model

	Phone  string
	Passwd string
}

func IsExist(phone string) bool {
	var user User
	db.Select("id").Where("phone = ?", phone).First(&user)

	if user.ID > 0 {
		return true
	}

	return false
}

func AddUser(phone string, passwd string) {
	db.Create(&User{
		Phone:  phone,
		Passwd: passwd,
	})
}

func IsRight(phone string, passwd string) bool {
	var user User
	db.Select("id").Where(User{Phone: phone, Passwd: passwd}).First(&user)
	if user.ID > 0 {
		return true
	}

	return false
}

func EditUser(phone string, data interface{}) {
	db.Model(&User{}).Where("phone = ?", phone).Updates(data)
}
