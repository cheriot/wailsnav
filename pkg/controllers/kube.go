package controllers

import (
	"context"

	"github.com/cheriot/kubenav/pkg/app"

	wailsruntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type Kube struct {
	ctx context.Context
}

// OnStarup is called at application startup
func (k *Kube) OnStartup(ctx context.Context) {
	k.ctx = ctx
}

func (k *Kube) ContextList() []string {
	ctxList, err := app.KubeContextList()
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting ctx list: %s", err.Error())
		return []string{}
	}
	return ctxList
}

func (k *Kube) NamespaceList(ctxParam string) []string {
	kubeCluster, err := app.GetOrMakeKubeCluster(k.ctx, ctxParam)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting cluster for name %s: %s", ctxParam, err.Error())
		return []string{}
	}

	nsList, err := kubeCluster.KubeNamespaceList(k.ctx)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting namespaces for cluster %s: %s", ctxParam, err.Error())
		return []string{}
	}
	return nsList
}