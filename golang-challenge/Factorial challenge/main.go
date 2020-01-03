package main

import (
	"fmt"
)

func main() {
	f := factorial(15)
	for total := range f {
		fmt.Println("Total:", total)
	}
}

func factorial(n int) chan int {
	c := make(chan int)
	go func() {
		result := 1
		for index := 1; index <= n; index++ {
			result *= index
		}
		c <- result
		close(c)
	}()
	return c
}
