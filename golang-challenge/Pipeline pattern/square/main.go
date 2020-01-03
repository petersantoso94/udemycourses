package main

import (
	"fmt"
)

func main() {
	//setup pipeline
	// g := gen(2, 50, 888)
	// out := sq(g)

	// in range out
	for res := range sq(gen(2, 50, 888)) {
		fmt.Println(res)
	}
}

func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func sq(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}
