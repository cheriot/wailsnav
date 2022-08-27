package controllers

import (
	"github.com/cheriot/kubenav/pkg/app"
)

type Kube struct {}

func (k *Kube) ContextList() ([]string, error) {
	return app.KubeContextList()
}