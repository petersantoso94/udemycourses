package main

import "fmt"

func main() {
	cards, err := newDeckFromFile("deck")
	if err != nil {
		fmt.Println(err)
	}
	cards.shuffle()
	cards.print()
}
