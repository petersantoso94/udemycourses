package main

import (
	"fmt"
	"io"
	"net/http"
)

// pointer tutorial
type person struct {
	firstName string
	lastName  string
}

func (p *person) changeName(name string) {
	p.firstName = name
}

func (s deck) changeFirst(str string) {
	s[0] = str
}

// map tutorial

func printMap(m map[string]string) {
	for name, hex := range m {
		fmt.Println(fmt.Sprintf("%v hex code is %v", name, hex))
	}
}

// interface tutorial
type bot interface {
	getGreetings(string) string
}
type engBot struct {
}
type chnBot struct{}

func (c chnBot) getGreetings(string) string {
	return "為確保您"
}

func (c engBot) getGreetings(string) string {
	return "hit there"
}

func printGreetings(b bot) {
	fmt.Println(b.getGreetings("test"))
}

type customWritter struct{}

func (customWritter) Write(p []byte) (n int, err error) {
	fmt.Println(string(p))
	return 0, nil
}

func main() {
	cards, err := newDeckFromFile("deck")
	if err != nil {
		fmt.Println(err)
	}
	cards.shuffle()
	// cards.print()

	// struct and pointer tutorial
	p := person{
		firstName: "peter",
		lastName:  "santoso",
	}
	p.changeName("pichoy")

	fmt.Printf("%+v", p)

	// with slice it will update without pointer

	slices := deck{"abc", "def"}
	slices.changeFirst("ghi")
	fmt.Printf("%+v", slices)

	// map tutorial
	fmt.Println("")
	m := map[string]string{
		"white": "#ffffff",
		"red":   "ff0000",
	}
	printMap(m)

	// interface tutorial
	eng := engBot{}
	chn := chnBot{}
	printGreetings(chn)
	printGreetings(eng)

	h, errh := http.Get("http://google.com")
	if errh != nil {
		fmt.Printf(errh.Error())
	}
	// fbody := make([]byte, 99999)
	// n, errread := h.Body.Read(fbody)
	// if errread != nil {
	// 	fmt.Println(errread.Error())
	// }
	// fmt.Println(fmt.Sprintf("%v bytes", n))
	// fmt.Printf(string(fbody))

	// use io Copy
	// os stdout implements writter interface, response body implements reader interface
	io.Copy(customWritter{}, h.Body)
}
